import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const PaginationButton = () => {
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

export default PaginationButton;
