import makeStyles from '@mui/styles/makeStyles'

const useStyles = makeStyles({
    root:{
        width :'100%',
        height : '80vh',
        fontFamily:'ubuntu'
    },

    box:{
        marginTop:35,
        width: 600,
        height : 'auto',
        border: '1px solid #2c3e50',
        borderRadius:5,
        padding:15
    },
    
    helperTextStyle:{
        color: "#d32f2f",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
        textAlign: "left",
        marginTop: "3px",
        marginBottom: "0",
    },

    roott:{
        marginTop:35,
        width :'100%',
        height : '80vh',
        fontFamily:'ubuntu'
    },


    boxx:{
        width: 750,
        height : 'auto',
        padding:15
    },
})

export {useStyles}