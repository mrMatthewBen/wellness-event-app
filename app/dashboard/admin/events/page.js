"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/table";
import axiosWithToken from "@/utils/fetchWithToken";

function page() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await axiosWithToken.get(
          `/api/wellness-events?page=${page}&limit=10`,
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log("false");
      }
    };

    fetchData(page);
  }, [page]);

  return (
    <>
      <h1>React Table with Pagination in Next.js</h1>
      <Table setPage={setPage} page={page} data={data} />
    </>
  );
}

export default page;
