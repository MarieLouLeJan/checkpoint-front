import { useCountriesQuery } from "@/types/graphql";
import { Button, CircularProgress } from "@mui/material";
import Card from "@mui/material/Card";
import styles from "./index.module.css";

export default function Home() {
  const { loading, data, error, refetch } = useCountriesQuery({
    onCompleted(data) {
      console.log("DATA", data);
    },
    onError(error) {
      console.log("ERROR", error);
    },
  });

  const loadingOrError = () => {
    if (loading || error) {
      return (
        <>{loading ? <CircularProgress /> : <h2>Something went wrong</h2>}</>
      );
    }
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <h1>Hello, wilder !</h1>
        <h3>Here you'll find a list of country that might interest you</h3>

        <Button variant="contained" href="/countries/createCountry">
          Create a new country
        </Button>
      </div>

      {!data ? (
        loadingOrError()
      ) : (
        <div className={styles.cardsContainer}>
          {data.countries.map(({ name, emoji, continent, code }) => {
            return (
              <Card variant="outlined" className={styles.card}>
                <h3>{name}</h3>
                <p>Continent: {continent?.name}</p>
                <p>{emoji}</p>
                <Button variant="outlined" href={`/countries/${code}`}>
                  See more{" "}
                </Button>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
