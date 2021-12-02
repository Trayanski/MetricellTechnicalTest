import React, {useEffect} from "react"
import { Grid, TextField, withStyles } from "@material-ui/core"
import useForm from './useForm'
import { Button } from "reactstrap"
import { connect } from 'react-redux'
import * as actions from '../actions/employee'
import { useToasts } from 'react-toast-notifications'

const styles = theme => ({
    root:{
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230
        }
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    name: '',
    value: ''
}

const EmployeeForm = ({classes, ...props}) => {
    
    // toast msg
    const { addToasts } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? '' : '"Name" field is required.'
        if ('value' in fieldValues)
            temp.value = fieldValues.value ? '' : '"Value" field is required.'
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === '')
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate()){
            const onSuccess = () => {
                resetForm()
                addToasts('Submitted Successfully', {appearance: 'success'})
            }

            if (props.currentId === 0)
                props.createEmployee(values, onSuccess)
            else
                props.updateEmployee(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0){
            setValues({
                ...props.employeeList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete='off' noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField 
                        name='name' 
                        variant='outlined' 
                        label='Name' 
                        value={values.name} 
                        onChange={handleInputChange}
                        // conditionally adding properties into a component
                        {...(errors.name && {error: true, helperText: errors.name})}
                    />
                    <TextField 
                        name='value' 
                        variant='outlined' 
                        label='Value' 
                        value={values.value} 
                        onChange={handleInputChange}
                        // conditionally adding properties into a component
                        {...(errors.value && {error: true, helperText: errors.value})}
                    />
                    <div>
                        <Button variang='contained' color='primary' className={classes.smMargin}>Submit</Button>
                        <Button variang='contained' className={classes.smMargin} onClick={resetForm} >Reset</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
}

const mapStateToProps = state => ({
    employeeList: state.employee.list
})

const mapActionToProps = {
    createEmployee: actions.create,
    updateEmployee: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EmployeeForm))