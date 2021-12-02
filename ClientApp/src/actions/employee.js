import api from "./api"

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL'
} 

const formatData = data => ({
    ...data,
    value: parseInt(data.value?data.value:0)
})

export const fetchAll = () => {
    return dispatch => {
        api.employee()
        .fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })   
        })
        .catch(err => console.log(err))    
    }
}

export const create = (data, onSuccess) => {
    return dispatch => {
        data = formatData(data)
        
        api.employee() 
        .create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: response.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))    
    }
}

export const update = (id, data, onSuccess) => {
    return dispatch => {
        data = formatData(data)
        
        api.employee() 
        .update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))    
    }
}

export const Delete = (id, onSuccess) => {
    return dispatch => {
        api.employee() 
        .delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))    
    }
}