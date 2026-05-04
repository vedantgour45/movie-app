import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Img from "../../components/lazyLoadImage/Img";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
import BackButton from "../../components/backButton/BackButton";
import avatar from "../../assets/avatar.png";

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useFetch(`/person/${id}`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/person/${id}/combined_credits`
  );

  const { url } = useSelector((state) => state.home);

  const profileImg = data?.profile_path
    ? url.profile + data.profile_path
    : avatar;

  // Sort credits by popularity/vote_count
  const sortedCast = credits?.cast
    ?.filter((item) => item.poster_path)
    ?.sort((a, b) => b.vote_count - a.vote_count);

  const sortedCrew = credits?.crew
    ?.filter((item) => item.poster_path)
    ?.sort((a, b) => b.vote_count - a.vote_count);

  // Remove duplicates from crew
  const uniqueCrew = sortedCrew?.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  const calculateAge = (birthday, deathday) => {
    const end = deathday ? dayjs(deathday) : dayjs();
    return end.diff(dayjs(birthday), "year");
  };

  if (loading) {
    return (
      <div className="personDetailsPage">
        <Spinner initial={true} />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="personDetailsPage">
      <ContentWrapper>
        <BackButton location="/" />
        <div className="personContent">
          <div className="left">
            <div className="profileImgWrapper">
              <Img className="profileImg" src={profileImg} />
            </div>
            <div className="personalInfo mobile-hide">
              <h3>Personal Info</h3>
              {data.known_for_department && (
                <div className="infoBlock">
                  <span className="label">Known For</span>
                  <span className="value">{data.known_for_department}</span>
                </div>
              )}
              {data.gender !== undefined && (
                <div className="infoBlock">
                  <span className="label">Gender</span>
                  <span className="value">
                    {data.gender === 1
                      ? "Female"
                      : data.gender === 2
                      ? "Male"
                      : "Not specified"}
                  </span>
                </div>
              )}
              {data.birthday && (
                <div className="infoBlock">
                  <span className="label">Birthday</span>
                  <span className="value">
                    {dayjs(data.birthday).format("MMM DD, YYYY")}
                    {!data.deathday &&
                      ` (${calculateAge(data.birthday)} years old)`}
                  </span>
                </div>
              )}
              {data.deathday && (
                <div className="infoBlock">
                  <span className="label">Day of Death</span>
                  <span className="value">
                    {dayjs(data.deathday).format("MMM DD, YYYY")}
                    {` (${calculateAge(data.birthday, data.deathday)} years old)`}
                  </span>
                </div>
              )}
              {data.place_of_birth && (
                <div className="infoBlock">
                  <span className="label">Place of Birth</span>
                  <span className="value">{data.place_of_birth}</span>
                </div>
              )}
              {data.also_known_as?.length > 0 && (
                <div className="infoBlock">
                  <span className="label">Also Known As</span>
                  {data.also_known_as.map((name, i) => (
                    <span key={i} className="value aka">
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="right">
            <h1 className="personName">{data.name}</h1>
            {data.biography && (
              <div className="biography">
                <h3>Biography</h3>
                <p>{data.biography}</p>
              </div>
            )}

            {/* Personal info for mobile */}
            <div className="personalInfo mobile-show">
              <h3>Personal Info</h3>
              <div className="infoGrid">
                {data.known_for_department && (
                  <div className="infoBlock">
                    <span className="label">Known For</span>
                    <span className="value">{data.known_for_department}</span>
                  </div>
                )}
                {data.birthday && (
                  <div className="infoBlock">
                    <span className="label">Birthday</span>
                    <span className="value">
                      {dayjs(data.birthday).format("MMM DD, YYYY")}
                    </span>
                  </div>
                )}
                {data.place_of_birth && (
                  <div className="infoBlock">
                    <span className="label">Place of Birth</span>
                    <span className="value">{data.place_of_birth}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Known For (Acting) */}
            {sortedCast?.length > 0 && (
              <div className="filmography">
                <h3>Known For (Acting)</h3>
                <div className="filmGrid">
                  {sortedCast.slice(0, 20).map((item, index) => (
                    <MovieCard
                      key={`cast-${item.id}-${index}`}
                      data={item}
                      mediaType={item.media_type}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Known For (Crew) */}
            {uniqueCrew?.length > 0 && (
              <div className="filmography">
                <h3>Behind the Camera</h3>
                <div className="filmGrid">
                  {uniqueCrew.slice(0, 10).map((item, index) => (
                    <MovieCard
                      key={`crew-${item.id}-${index}`}
                      data={item}
                      mediaType={item.media_type}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default PersonDetails;
