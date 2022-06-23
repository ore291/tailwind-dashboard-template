import React, { useState, useEffect, useMemo } from "react";
import Layout from "../components/Layout";
import Table, { SelectColumnFilter } from "../components/Table";
import { useGetCategoriesQuery } from "../store/services/categories";
import CategoryCard from "../components/categories/CategoryCard";

const Categories = () => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery(1);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto bg-white">
        <h1 className="text-3xl font-semibold">Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {categories &&
            categories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
        {error && error.data}
        {/* <Table columns={columns} data={data} /> */}
      </div>
    </Layout>
  );
};

export default Categories;
