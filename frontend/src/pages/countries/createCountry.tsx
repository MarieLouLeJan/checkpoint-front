import {
  Continent,
  NewCountryInput,
  useAddCountryMutation,
  useContinentsQuery,
} from "@/types/graphql";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styles from "./country.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

const defaultValues: NewCountryInput = {
  code: "",
  name: "",
  emoji: "",
  continent: {
    id: 0,
  },
};

export default function CreateCountry() {
  const [newCountry, setNewCountry] = useState<NewCountryInput>(defaultValues);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [createCountryError, setCreateCountryError] = useState<null | string>(
    null
  );

  const { data } = useContinentsQuery({
    onCompleted(data) {
      setContinents(data.continents);
    },
    onError(error) {
      console.log("ERROR", error);
    },
  });

  const [createCountry] = useAddCountryMutation({
    onCompleted(data) {
      router.push(`/countries/${data.addCountry.code}`);
    },
    onError(error) {
      setCreateCountryError("Something went wrong");
    },
  });

  const router = useRouter();

  const handleCreateCountry = () => {
    setCreateCountryError(null);
    createCountry({
      variables: {
        data: newCountry,
      },
    });
  };

  return (
    <>
      <h1 className={styles.title}>Create a new country</h1>

      {createCountryError && <h2>{createCountryError}</h2>}

      <div className={styles.form}>
        <TextField
          variant="outlined"
          value={newCountry.name}
          label="name"
          onChange={(e) =>
            setNewCountry((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <TextField
          variant="outlined"
          value={newCountry.emoji}
          label="emoji"
          onChange={(e) =>
            setNewCountry((prev) => ({ ...prev, emoji: e.target.value }))
          }
        />

        <TextField
          variant="outlined"
          value={newCountry.code}
          label="code"
          onChange={(e) =>
            setNewCountry((prev) => ({ ...prev, code: e.target.value }))
          }
        />

        <FormControl>
          <InputLabel id="continent">Continent</InputLabel>
          <Select
            value={newCountry.continent?.id}
            label="continent"
            onChange={(e) =>
              setNewCountry((prev) => ({
                ...prev,
                continent: { id: e.target.value as number },
              }))
            }
          >
            {continents.map(({ id, name }) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleCreateCountry}>
          Create{" "}
        </Button>
      </div>
    </>
  );
}
