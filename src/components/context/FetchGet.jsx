import React, {useState, useEffect} from 'react'

function FetchGet(url) {

    const [data, setData] = useState([]);
    async function getData() {
      await fetch(url)
       .then((res) => res.json())
       .then((get) => setData(get))
       .catch((err) => console.log(err))
     }
     
     useEffect(() => {
       getData();
     }, [url])

  return {data}
}

export default FetchGet