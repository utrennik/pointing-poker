import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { gameResults } from './resultData';

const ResultTable = () => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Issue Title</TableCell>
          <TableCell>Issue Description</TableCell>
          <TableCell align="right">Score</TableCell>
          <TableCell align="right">Score Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gameResults.map((row) => (
          <TableRow key={row.issueName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {row.issueName}
            </TableCell>
            <TableCell component="th" scope="row">
              {row.issueDescription}
            </TableCell>
            <TableCell align="right">{row.issueScore}</TableCell>
            <TableCell align="right">{row.issueScoreTypeShort}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ResultTable;
