import { useState, useRef, useEffect } from "react";
import "./home.css";
import AddWatchList from "../AddWatchList/addwatchlist";
import WatchList from "../WatchList/watchlist";
import Suggest from "../Suggest/suggest";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Home() {
  const [data, setData] = useState([]);
  const childRef = useRef(null);
  const [text, setText] = useState("");
  const [suggest, setSuggest] = useState();
  const [display, setDisplay] = useState(false);
  const [focus, setFocus] = useState(true);
  const vis = useRef(true);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const username = localStorage.getItem("username");
    axios
      .get(`http://localhost:8000/getWatchListByUsername?username=${username}`)
      .then((res) => {
        setData(res.data.watchList);
      })
      .catch((err) => {
        window.location.href = "/login";
      });
  }, []);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (data.length > 0) {
      axios
        .post("http://localhost:8000/createList", {
          username: username,
          watchList: data,
        })
        .then((res) => { })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  useEffect(() => {
    if(text===''){
      setDisplay(false);
      vis.current = true;
    }
    axios
      .get(
        `https://financialmodelingprep.com/api/v3/search?query=${text}&limit=10&apikey=oeZLpIgP4LF3FTjHiCD4or43Lz9EEpE5`
      )
      .then((response) => {
        console.log(response);
        setSuggest(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [text]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (childRef.current && !childRef.current.contains(event.target)) {
        if (!focus) {
          setDisplay(false);
          vis.current = true;
        }
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const handleChange = (e) => {
    setText(e.target.value);
    setDisplay(true);
  };
  const handleFocus = (e) => {
    setFocus(true);
  };
  const handleBlur = (e) => {
    setFocus(false);
  };

  const handleStock = async (stock) => {
    const new_data = [...data];
    if (!new_data[current]) {
      new_data[current] = [];
    }


    axios
      .get(
        `https://financialmodelingprep.com/api/v3/profile/${stock.symbol}?apikey=oeZLpIgP4LF3FTjHiCD4or43Lz9EEpE5`
      )
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          new_data[current].push({ name: stock.name, symbol: stock.symbol, price: response.data[0]['price'] });
          console.log(new_data);
          setData(new_data);
        }

      })
      .catch((error) => {
        console.log(error);
      });


  };
  function addwatchlist(index) {
    vis.current = false;
    setCurrent(index);
  }
  function switchWatchList(index) {
    vis.current = true;
    setCurrent(index);
  }

  function deleteWatchList(index) {
    setData((prvs) => {
      return prvs.slice(0, -1);
    });
    setCurrent(index - 1);
  }

  const handleLogout = async () => {
    localStorage.removeItem("user");
    await axios.get("http://localhost:8000/logout");
    window.location.href = "/login";
  };
  return (
    <>
    <div className="header-container">

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Add Stocks" variant="outlined" onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur} />

      </Box>

      <Stack direction="row" spacing={2}>
        <Button style={{ margin: 10 }} variant="outlined" color="error" onClick={handleLogout}>
          Log Out
        </Button>
      </Stack>
    </div>



      {display ? (
        <div className="suggestContainer" ref={childRef}>
          {suggest && <Suggest stocks={suggest} handleStock={handleStock} />}
        </div>
      ) : (
        vis.current &&
        data.length > 1 && <WatchList data={data[current]} index={current} />
      )}
      {data.length > 1 && (
        <AddWatchList
          switchWatchList={switchWatchList}
          len={data.length - 1}
          deleteWatchList={deleteWatchList}
          addwatchlist={addwatchlist}
        />
      )}
    </>
  );
}

export default Home;
