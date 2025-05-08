import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GetAppIcon from '@mui/icons-material/GetApp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Payments = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const transactions = [
    {
      id: 1,
      date: '2024-01-15',
      description: 'Website Development Project',
      amount: 1500,
      status: 'completed',
      type: 'income'
    },
    {
      id: 2,
      date: '2024-01-10',
      description: 'Logo Design Project',
      amount: 500,
      status: 'pending',
      type: 'income'
    },
    {
      id: 3,
      date: '2024-01-05',
      description: 'Platform Fee',
      amount: 50,
      status: 'completed',
      type: 'expense'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Payments
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceWalletIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6">Available Balance</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>$2,450.00</Typography>
              <Button variant="contained" color="primary" startIcon={<PaidIcon />}>
                Withdraw Funds
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaidIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6">Total Earnings</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>$12,750.00</Typography>
              <Typography color="textSecondary">Last 30 days</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReceiptIcon color="info" sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6">Pending Payments</Typography>
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>$500.00</Typography>
              <Typography color="textSecondary">2 pending transactions</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Transaction History */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Transaction History</Typography>
              <Button startIcon={<GetAppIcon />}>
                Export
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Typography
                          color={transaction.type === 'income' ? 'success.main' : 'error.main'}
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          ${transaction.amount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.status}
                          color={getStatusColor(transaction.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={handleClick}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>View Details</MenuItem>
              <MenuItem onClick={handleClose}>Download Invoice</MenuItem>
              <MenuItem onClick={handleClose}>Report Issue</MenuItem>
            </Menu>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payments;