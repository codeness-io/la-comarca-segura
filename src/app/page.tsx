import Image from "next/image";
import styles from "./page.module.css";
import { Grid } from "@mui/material";
import BasicSelect from "@/components/BasicSelect";

export default function Home() {
  return (
    <main className={styles.main}>
      <BasicSelect />
    </main>
  );
}
