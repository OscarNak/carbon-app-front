import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function GesTable(props) {

    const {
        res
    } = props


  return (
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell >intitulé</TableCell>
            <TableCell align="right">KgeqCO2/semaine</TableCell>
            <TableCell align="right">KgeqCO2/année</TableCell>
          </TableRow>
        </TableHead>


        <TableBody>

            { Object.entries(res).map(([key, value]) => (

                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                    <TableCell component="th" scope="row">
                        {key.replace(/_/g, ' ')}
                    </TableCell>
                    <TableCell align="right">{(value / 45).toPrecision(4)}</TableCell>
                    <TableCell align="right">{value.toPrecision(4)}</TableCell>
                </TableRow>
            ))}


        </TableBody>
      </Table>
    </TableContainer>
  )
}
