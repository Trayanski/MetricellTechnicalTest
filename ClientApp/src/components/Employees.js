import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from 'reactstrap'
import * as actions from '../actions/employee' 
import EmployeesForm from './EmployeeForm'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useToasts } from 'react-toast-notifications'

const styles = theme => ({
    root: {
        '& .MuiTableCell-head':{
            fontSize: '1.25rem'
        }
    }
})

const Employees = ({classes, ...props}) => {
    // toast msg
    const { addToasts } = useToasts()
    
    const [currentId, setCurrentId] = useState(0)
    
    // when component is fully loaded
    useEffect(() => {
        props.fetchAllEmployees()
    }, [])
    
    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteEmployee(id, () => {
                addToasts('Deleted Successfully', {appearance: 'info'})
            })
    }

    return (
        <Paper  elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <EmployeesForm {...({currentId, setCurrentId})} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.employeeList.map((record, index) => {
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>{record.name}</TableCell>
                                                <TableCell>{record.value}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant='text'>
                                                        <Button><EditIcon color='primary' onClick={() => { setCurrentId(record.id) }} /></Button>
                                                        <Button><DeleteIcon color='secondary' onClick={() => onDelete(record.id)} /></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    employeeList: state.employee.list
})

const mapActionToProps = {
    fetchAllEmployees: actions.fetchAll,
    deleteEmployee: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Employees));