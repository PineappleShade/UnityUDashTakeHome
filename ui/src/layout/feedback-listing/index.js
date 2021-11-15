import React, { useEffect, useState } from 'react';
import axios from "axios";
import {DataGrid} from "@mui/x-data-grid";
import {Rating, Tooltip} from "@mui/material";

// const columns = [
//   {
//     field: 'id',
//     headerName: 'ID',
//     minWidth: 300,
//   },
//   {
//     field: 'gameSessionId',
//     headerName: 'Game Session',
//     minWidth: 300,
//   },
//   {
//     field: 'userId',
//     headerName: 'User Id',
//     minWidth: 300,
//   },
//   {
//     field: 'rating',
//     headerName: 'Rating',
//     type: 'number',
//     // renderCell: (params) => (
//     //   <Rating
//     //     value={params.value}
//     //     readOnly
//     //   />
//     // ),
//     minWidth: 150,
//   },
//   {
//     field: 'comment',
//     headerName: 'Comment',
//     // renderCell: (params) => {
//     //   let cellVal = params.value;
//     //   if (params.value.length > 140) {
//     //     cellVal = (
//     //       <Tooltip title={params.value} placement="bottom-start">
//     //         <span>{params.value}</span>
//     //       </Tooltip>
//     //     )
//     //   }
//     //   return cellVal
//     // },
//     sortable: false,
//     minWidth: 700,
//   },
//   {
//     field: 'created',
//     headerName: 'Created On',
//     type: 'date',
//     minWidth: 150,
//   },
// ];

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

function FeedbackListing() {
  const API_ENDPOINT = 'http://localhost:3000/api';
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getFeedback();
  }, []);

  async function getFeedback(){
    try{
      setIsLoading(true);
      const feedback = await axios.get(`${API_ENDPOINT}/feedback`)
      const parsedData = feedback.data.map( f => (
        {
          id: f.feedbackId,
          gameSessionId: f.gameSessionId,
          userId: f.userId,
          rating: f.rating,
          comment: f.comment,
          created: f.created,
        }
      ));
      setRows(parsedData);
      setIsLoading(false);
    } catch (e) {
      console.error('Failed to fetch feedback: ' + e.message);
    }
  }

  return (
    <div>
      {/*<DataGrid*/}
      {/*  rows={rows}*/}
      {/*  columns={columns}*/}
      {/*  // disableSelectionOnClick*/}
      {/*  // autoHeight*/}
      {/*  // autoPageSize*/}
      {/*  // loading={isLoading}*/}
      {/*/>*/}
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default FeedbackListing;