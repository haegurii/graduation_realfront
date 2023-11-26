import { useSearchParams } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import StudyContent from "../../components/StudyContent";
import testImage from "../../assets/images/test.png";
import axiousInstance from "../../utils/axios";
import { useEffect, useState } from "react";

const SearchResult = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const [signLanguages, setSignLanguages] = useState([]);

  // 수어검색
  useEffect(() => {
    searchSignLanguages(search);
  }, [search]);

  const searchSignLanguages = async (search) => {
    const params = {
      search,
    };
    try {
      const response = await axiousInstance.get(`signLanguages/search`, {
        params,
      });
      console.log("search:" + search + "response:" + response);
      setSignLanguages(response.data.signLanguages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Searchbar />

      {search && (
        <h1 className="study-search-text">
          “{search}”에 대한 검색 결과입니다.
        </h1>
      )}
      <StudyContent type="search" list={signLanguages} />
    </div>
  );
};

export default SearchResult;
