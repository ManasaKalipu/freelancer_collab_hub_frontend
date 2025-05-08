import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Card, CardContent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');

  // Mock data for payment history
  const transactions = [
    {
      id: 1,
      date: '2024-01-20',
      description: 'Project Payment - Website Development',
      amount: 2500,
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-01-15',
      description: 'Milestone Payment - UI Design',
      amount: 1000,
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-01-10',
      description: 'Project Payment - Mobile App',
      amount: 3000,
      status: 'Pending'
    }
  ];

  const handleAddFunds = (e) => {
    e.preventDefault();
    // TODO: Implement payment processing logic
    console.log('Processing payment:', amount);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payments & Transactions
      </Typography>

      <Grid container spacing={3}>
        {/* Account Balance */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Available Balance
              </Typography>
              <Typography variant="h4">$5,500.00</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate('/withdraw')}
              >
                Withdraw Funds
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Add Funds */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add Funds
            </Typography>
            <Box component="form" onSubmit={handleAddFunds}>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!amount}
                  >
                    Add Funds
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Transaction History */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Transaction History
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell align="right">
                        ${transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            bgcolor:
                              transaction.status === 'Completed'
                                ? 'success.light'
                                : 'warning.light',
                            color:
                              transaction.status === 'Completed'
                                ? 'success.dark'
                                : 'warning.dark',
                            px: 1,
                            borderRadius: 1,
                            display: 'inline-block'
                          }}
                        >
                          {transaction.status}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() => console.log('View receipt:', transaction.id)}
                        >
                          View Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Payment Methods */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Payment Methods
              </Typography>
              <Button
                variant="outlined"
                onClick={() => console.log('Add payment method')}
              >
                Add New Method
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">
                      •••• •••• •••• 4242
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Expires 12/24
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment;