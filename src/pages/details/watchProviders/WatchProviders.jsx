import React from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import "./style.scss";

const WatchProviders = ({ mediaType, id }) => {
  const { data: providerData, loading: providerLoading } = useFetch(`/${mediaType}/${id}/watch/providers`);
  const { data: movieData, loading: movieLoading } = useFetch(`/${mediaType}/${id}`);
  
  const providers = providerData?.results?.IN || providerData?.results?.US;

  if (providerLoading || movieLoading) return null;

  const renderProviders = (list, title) => {
    if (!list || list.length === 0) return null;
    return (
      <div className="providerGroup">
        <span className="providerLabel">{title}</span>
        <div className="providerLogos">
          {list.map((provider) => (
            <div key={provider.provider_id} className="providerItem" title={provider.provider_name}>
              <Img
                className="providerLogo"
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const isReleased = movieData?.status === "Released";
  const releaseDate = movieData?.release_date || movieData?.first_air_date;
  const isFuture = releaseDate && new Date(releaseDate) > new Date();

  return (
    <div className="watchProviders">
      <ContentWrapper>
        <div className="sectionHeading">Where to Watch</div>
        {providers ? (
          <>
            <div className="providersContainer">
              {renderProviders(providers.flatrate, "Stream")}
              {renderProviders(providers.rent, "Rent")}
              {renderProviders(providers.buy, "Buy")}
              {renderProviders(providers.ads, "Free with Ads")}
            </div>
            <div className="tmdbCredit">
              Data provided by{" "}
              <a
                href={providerData?.results?.IN?.link || providerData?.results?.US?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                JustWatch
              </a>
            </div>
          </>
        ) : (
          <div className="noProviders">
            {isFuture ? (
              <p className="statusMsg comingSoon">
                🚀 Yet to be released. Coming soon to theaters!
              </p>
            ) : isReleased ? (
              <p className="statusMsg stayTuned">
                🎬 Just released! Stay tuned for OTT updates.
              </p>
            ) : (
              <p className="statusMsg unavailable">
                📺 Currently not available on OTT platforms in your region.
              </p>
            )}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default WatchProviders;
