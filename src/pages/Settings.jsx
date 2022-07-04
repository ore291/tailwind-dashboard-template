import React, { useState, useEffect } from "react";

import Layout from "../components/Layout";
import countriesData from "../tabledata/countries";
import { Badge, Pagination } from "flowbite-react";
import { Modal, Button, Toast } from "flowbite-react";
import {
  useUpdateSettingsMutation,
  useGetSettingsQuery,
} from "../store/services/items";
import { useNavigate } from "react-router-dom";

function Settings() {
  const [updateSettings, { isLoading, isSuccess }] =
    useUpdateSettingsMutation();

  const { data: settings, isLoading: getting } = useGetSettingsQuery();

  const [commision, setCommision] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    isSuccess && navigate("/settings");
  }, [isSuccess]);
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative z-0 w-full mb-6 group ">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="category_placeholder"
            >
              Set Rental commision percentage
            </label>
            {getting ? (
              <p>Loading</p>
            ) : (
              <div className="row-container">
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="category_placeholder"
                  id="category_placeholder"
                  type="number"
                  defaultValue={settings.commision}
                  min={1}
                  max={100}
                  onChange={(event) => setCommision(event.currentTarget.value)}
                />
                %
              </div>
            )}
          </div>
        </div>
        <Button onClick={() => updateSettings(commision)}>
          {isLoading ? "Loading..." : "Save"}
        </Button>
      </div>
    </Layout>
  );
}

export default Settings;
