import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import DeleteModel from "../../components/common/DeleteModel";
import axios from "axios";
import { toast } from "react-toastify";

const Items = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await axios.get("http://13.213.208.92:7083/ecsacc/api/getAllMstrItems");
      setData(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getItemData = async () => {
      try {
        const resposnse = await axios.get(
          "http://13.213.208.92:7083/ecsacc/api/getAllMstrItems"
        );
        setData(resposnse.data);
      } catch (error) {
        toast.error("Error fetching data: ", error);
      }
    };
    getItemData();
  }, []);

  return (
    <div className="container-fluid px-2 minHeight">
      <div className="card shadow border-0 my-2">
        <div className="container-fluid py-4">
          <div className="row align-items-center justify-content-between ">
            <div className="col">
              <div className="d-flex align-items-center gap-4">
                <h1 className="h4 ls-tight headingColor ">Items</h1>
              </div>
            </div>
            <div className="col-auto">
              <div className="hstack gap-2 justify-content-end">
                <Link to="/items/add">
                  <button type="submit" className="btn btn-sm btn-button">
                    <span>Add +</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="removeHrMargin"></hr>
        <div className="table-responsive p-2 minHeight">
          <table ref={tableRef} className="display table">
            <thead className="thead-light">
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S.NO
                </th>
                <th scope="col" className="text-center">
                  Item Code
                </th>
                <th scope="col" className="text-center">
                  Item Name
                </th>
                <th scope="col" className="text-center">
                  Cost Price
                </th>
                <th scope="col" className="text-center">
                  Unit
                </th>
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{data.ItemCode}</td>
                  <td className="text-center">{data.ItemName}</td>
                  <td className="text-center">{data.costPrice}</td>
                  <td className="text-center">{data.unit}</td>
                  <td className="text-center">
                    <div className="gap-2">
                      <Link to={`/items/view/${data.id}`}>
                        <button className="btn btn-light btn-sm  shadow-none border-none">
                          View
                        </button>
                      </Link>
                      <Link to={`/items/edit/${data.id}`} className="px-2">
                        <button className="btn btn-light  btn-sm shadow-none border-none">
                          Edit
                        </button>
                      </Link>
                      <DeleteModel
                        onSucces={refreshData}
                        path={`http://13.213.208.92:7083/ecsacc/api/deleteMstrItem/${data.id}`}
                        style={{ display: "inline-block" }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-footer border-0 py-5"></div>
      </div>
    </div>
  );
};

export default Items;
