import { useCountryLazyQuery } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { Button, Card, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./country.module.css";

function Country() {
  const router = useRouter();

  const [findCountry, { data }] = useCountryLazyQuery({
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (router.query.code) {
      findCountry({ variables: { code: router.query.code as string } });
    }
  }, [router.query]);

  return (
    <div className={styles.countryContainer}>
      {data?.country ? (
        <Card variant="outlined" className={styles.countryCard}>
          <h2>{data.country.name}</h2>
          <p>Continent: {data.country.continent?.name}</p>
          <p>Flag: {data.country.emoji}</p>
        </Card>
      ) : (
        <CircularProgress />
      )}
      <Button variant="contained" href="/">
        Back home
      </Button>
    </div>
  );
}

export default Country;
