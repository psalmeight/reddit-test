import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import SnowWrap from "snoowrap";
import { useQuery } from "react-query";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { SnowWrapContext } from "../context/SnowWrapContext";
import CustomContainer from "../components/CustomContainer";
import Post from "../components/Post";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function Main() {
  const r = useContext(SnowWrapContext);
  const classes = useStyles();
  const router = useHistory();

  const [state, setState] = useState<{ sort: string }>({
    sort: "hot",
  });
  const [list, setList] = useState<SnowWrap.Listing<SnowWrap.Submission>>();

  const { isLoading, data, refetch, isFetching } = useQuery("data", () => {
    switch (state.sort) {
      case "hot":
        return r.getHot().then((result) => result);
      case "best":
        return r.getBest().then((result) => result);
      case "new":
        return r.getNew().then((result) => result);
      case "top":
        return r.getTop().then((result) => result);
    }
  });

  useEffect(() => {
    //console.log(data);
    setList(data);
  }, [data]);

  useEffect(() => {
    console.log(state);
    refetch();
  }, [state]);

  const viewPost = (id: string) => {
    router.push(`/view/${id}`);
  };

  const changeSort = (sort: string) => {
    setState({ ...state, sort });
  };

  return (
    <CustomContainer title={`Reddit List (${state?.sort.toUpperCase()})`}>
      <div>
        {isFetching ? (
          <Backdrop open={isFetching} className={classes.backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null}

        <div>
          <div>
            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              onClick={() => changeSort("hot")}
            >
              Hot
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              onClick={() => changeSort("best")}
            >
              Best
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              onClick={() => changeSort("new")}
            >
              New
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              onClick={() => changeSort("top")}
            >
              Top
            </Button>
          </div>
          <List component="nav">
            {list ? (
              list.map((row) => {
                return <Post content={row} onClick={() => viewPost(row.id)} />;
              })
            ) : (
              <span>0 results</span>
            )}
          </List>
        </div>
      </div>
    </CustomContainer>
  );
}
