import Head from 'next/head'
import { BASE_API_URL } from '../../constants';
import { GetServerSideProps } from 'next'
import { getStateData } from '../../service';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Circle from '../../components/Chart';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
 
    container: {
      minHeight: "100vh",
      padding: '0 0.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: `240px`,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
      },
    }
    ,main: {
      padding: '5rem 0',
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }
    
    ,footer: {
      width: "100%",
      height:"100px",
      borderTop: "1px solid #eaeaea",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      img :{
        marginLeft: "0.5rem",
    },
    a :{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
    }
    ,title :{
      margin:"0",
      lineHeight: "1.15",
    fontSize: "4rem",
    a: {
      color: "#0070f3",
      textDecoration: "none",
    },
    description: {
      textAlign: "center",
      lineHeight: "1.5",
      fontSize: "1.5rem",
    
    }
    }
    
    
    ,grid: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      maxWidth:" 800px",
  marginTop: "3rem",
    [theme.breakpoints.up('sm')]: {
    width: "100%",
      flexDirection: "column",}
    }
    
    ,card: {
      margin: "1rem",
      flexBasis: "45%",
      padding: "1.5rem",
      textAlign: "left",
      color: "inherit",
      textDecoration:' none',
      border: "1px solid #eaeaea",
      borderRadius:" 10px",
      transition: "color 0.15s ease, border-color 0.15s ease",
    }
    ,logo :{
      height: "1em",
    },
    titleHeading: {
      display:" flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      
    },
    titleStats: {
      color: "red",
      display: "flex",
      flexDirection:"column"
    }
    
  })
);

const State = ({ data ,state=""}) => {
  const styles = useStyles();
  const { stateData: { total: { confirmed = 0, deceased = 0, tested = 0, recovered = 0 } = {} } = {} } = data;
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <span className={styles.titleHeading}>
        
        
        <h2 className={styles.title}>
          {state.charAt(0).toUpperCase() + state.slice(1)}
          </h2>
          <span className={styles.titleStats}>

          {confirmed} {deceased}{tested}{recovered}
          </span>
        </span>


        <div className={styles.grid}>
          <div className={styles.card}>
          <Circle/> 
          </div>

        
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
export const getServerSideProps:GetServerSideProps = async (context) => {
  const { params: { id:state = '' } = {} } = context;
  const data = await getStateData(state);
  
  return {
    props: {data,state}, // will be passed to the page component as props
  }
}


export default State;