import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ResponseStats, Stats } from "./interfaces/Stats";
import api from "./utils/api";
import "./style.css";
import {
  Avatar,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Loader from "./components/loader/loader";
import moment from "moment";
import Error from "./components/error/error";

const fetchStats = async (
  page: number,
  limit: number
): Promise<ResponseStats> => {
  const res = await api<ResponseStats>({
    method: "get",
    url: `/api/v1/stats?page=${page}&limit=${limit}`,
  });
  if (res.status === 200) {
    return res.data;
  }
  throw new AxiosError(`error, status: ${res.status}`);
};

function App() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { isLoading, isError, error, data } = useQuery<
    ResponseStats,
    AxiosError<string, any>
  >({
    queryKey: ["stats", page, limit],
    queryFn: () => fetchStats(page, limit),
    keepPreviousData: true,
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  if (data?.data) {
    return (
      <Box>
        <TableContainer component={Paper} sx={{ height: "95vh" }}>
          <Table aria-label="table stats">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Avatar</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Nick gracza</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Nazwa filmiku</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Czas wrzucenia</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component={"th"} scope="row">
                    <Link href={row.profileURL}>
                      <Avatar alt="avatar" src={row.avatarURL}></Avatar>
                    </Link>
                  </TableCell>
                  <TableCell component={"th"} scope="row">
                    <Link
                      href={row.profileURL}
                      underline="hover"
                      color={"white"}
                    >
                      <Typography>{row.username}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell component={"th"} scope="row">
                    <Link href={row.youtubeURL} underline="hover">
                      <Typography>{row.youtubeName}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell component={"th"} scope="row">
                    <Typography>
                      {moment(row.datetime).format("YYYY/MM/DD HH:mm")}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: "100",
          }}
          component={"div"}
          count={data.count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    );
  }
  return <div></div>;
}

export default App;
