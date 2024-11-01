import { useEffect } from 'react'
import styles from "./dataTest.module.css"
import axios from 'axios';

const DataTest = () => {

    useEffect(() => {
        axios.get("http://localhost:3000")
        .then((res) => {
            console.log(res.data)
        })
    })

  return (
    <div className ={styles.testBox}>
        data
    </div>
  )
}

export default DataTest
