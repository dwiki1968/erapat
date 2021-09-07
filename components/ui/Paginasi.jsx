import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Paginasi = () => {
  //useSWR count data => total data

  //jumlah data perhalaman

  //count : jumlah data = jumlah page

  //yang dibutuhkan di parent adalah start => 1, 1+ jumlah data perhalaman + jumlah data perhalamn + jumlah data perhalam
  //
  const [page, setPage] = useState(1);

  const handleMin = () => {
    setPage(page - 1);
  };
  const handlePlus = () => {
    setPage(page + 1);
  };
  return (
    <>
      <ButtonGroup size="sm">
        <Button onClick={handleMin} leftIcon={<FiArrowLeft />}>
          Sebelum
        </Button>
        <Button>1</Button>
        <Button onClick={handlePlus} rightIcon={<FiArrowRight />}>
          Sesudah
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Paginasi;
