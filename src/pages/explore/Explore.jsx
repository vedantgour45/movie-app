import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

// Generate year options from current year down to 1950
const currentYear = new Date().getFullYear();
const yearData = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => ({
  value: currentYear - i,
  label: String(currentYear - i),
}));

const ratingData = [
  { value: 9, label: "9+ Masterpiece" },
  { value: 8, label: "8+ Excellent" },
  { value: 7, label: "7+ Great" },
  { value: 6, label: "6+ Good" },
  { value: 5, label: "5+ Average" },
  { value: 4, label: "4+ Below Average" },
  { value: 0, label: "All Ratings" },
];

const languageData = [
  { value: "", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "mr", label: "Marathi" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "ml", label: "Malayalam" },
  { value: "kn", label: "Kannada" },
  { value: "bn", label: "Bengali" },
  { value: "ko", label: "Korean" },
  { value: "ja", label: "Japanese" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
];

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const [year, setYear] = useState(null);
  const [rating, setRating] = useState(null);
  const [language, setLanguage] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    setYear(null);
    setRating(null);
    setLanguage(null);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1); // "[4,4,5,6,7]"
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    if (action.name === "year") {
      setYear(selectedItems);
      if (action.action !== "clear" && selectedItems) {
        if (mediaType === "movie") {
          filters.primary_release_year = selectedItems.value;
        } else {
          filters.first_air_date_year = selectedItems.value;
        }
      } else {
        delete filters.primary_release_year;
        delete filters.first_air_date_year;
      }
    }

    if (action.name === "rating") {
      setRating(selectedItems);
      if (action.action !== "clear" && selectedItems) {
        if (selectedItems.value > 0) {
          filters["vote_average.gte"] = selectedItems.value;
          filters["vote_count.gte"] = 50;
        } else {
          delete filters["vote_average.gte"];
          delete filters["vote_count.gte"];
        }
      } else {
        delete filters["vote_average.gte"];
        delete filters["vote_count.gte"];
      }
    }

    if (action.name === "language") {
      setLanguage(selectedItems);
      if (action.action !== "clear" && selectedItems && selectedItems.value) {
        filters.with_original_language = selectedItems.value;
      } else {
        delete filters.with_original_language;
      }
    }

    setPageNum(1);
    fetchInitialData();
  };

  const activeFilterCount = [genre?.length > 0, sortby, year, rating, language?.value].filter(Boolean).length;

  const clearAllFilters = () => {
    filters = {};
    setSortby(null);
    setGenre(null);
    setYear(null);
    setRating(null);
    setLanguage(null);
    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage">
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </div>
          <button
            className="filterToggleBtn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="filterCount">{activeFilterCount}</span>
            )}
          </button>
        </div>

        <div className={`filtersPanel ${showFilters ? "visible" : ""}`}>
          <div className="filters">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
            <Select
              name="year"
              value={year}
              options={yearData}
              onChange={onChange}
              isClearable={true}
              placeholder="Year"
              className="react-select-container yearDD"
              classNamePrefix="react-select"
            />
            <Select
              name="rating"
              value={rating}
              options={ratingData}
              onChange={onChange}
              isClearable={true}
              placeholder="Min Rating"
              className="react-select-container ratingDD"
              classNamePrefix="react-select"
            />
            <Select
              name="language"
              value={language}
              options={languageData}
              onChange={onChange}
              isClearable={true}
              placeholder="Language"
              className="react-select-container languageDD"
              classNamePrefix="react-select"
            />
          </div>
          {activeFilterCount > 0 && (
            <button className="clearFiltersBtn" onClick={clearAllFilters}>
              Clear All Filters
            </button>
          )}
        </div>

        {loading && <Spinner initial={true} />}
        {!loading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} mediaType={mediaType} />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <span className="resultNotFound">Sorry, Results not found!</span>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
