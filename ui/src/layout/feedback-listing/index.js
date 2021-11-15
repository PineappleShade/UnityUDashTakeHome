import React, { useEffect, useState } from 'react';
import axios from "axios";
import {DataGrid, GridRenderCellParams} from "@mui/x-data-grid";
import {Paper, Rating, Tooltip} from "@mui/material";
import _ from 'lodash';

// `feedbackId` VARCHAR(36),
//   `gameSessionId` VARCHAR(36),
//   `userId` VARCHAR(36),
//   `rating` INTEGER,
//   `comment` TEXT,
//   `created` INT NOT NULL,

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    minWidth: 300,
  },
  {
    field: 'gameSessionId',
    headerName: 'Game Session',
    minWidth: 300,
  },
  {
    field: 'userId',
    headerName: 'User Id',
    minWidth: 300,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    renderCell: (params) => (
      <Rating
        value={params.value}
        readOnly
      />
    ),
    minWidth: 150,
  },
  {
    field: 'comment',
    headerName: 'Comment',
    renderCell: (params) => {
      let cellVal = params.value;
      if (params.value.length > 140) {
        cellVal = (
          <Tooltip title={params.value} placement="bottom-start">
            <span>{params.value}</span>
          </Tooltip>
        )
      }
      return cellVal
    },
    sortable: false,
    minWidth: 700,
  },
  {
    field: 'created',
    headerName: 'Created On',
    type: 'date',
    minWidth: 150,
  },
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
    <DataGrid
      rows={rows}
      columns={columns}
      disableSelectionOnClick
      autoHeight
      autoPageSize
      loading={isLoading}
    />
  );
}

export default FeedbackListing;