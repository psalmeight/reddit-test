import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import SnowWrap from "snoowrap";
import { useQuery } from "react-query";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { SnowWrapContext } from "../context/SnowWrapContext";
import CustomContainer from "../components/CustomContainer";

export default function Main() {
  const r = useContext(SnowWrapContext);

  const router = useHistory();

  const [list, setList] = useState<SnowWrap.Listing<SnowWrap.Submission>>();

  const { isLoading, data } = useQuery("hotData", () =>
    r.getHot().then((result) => result)
  );

  useEffect(() => {
    setList(data);
  }, [data]);

  const viewPost = (id: string) => {
    router.push(`/view/${id}`);
  };

  return (
    <CustomContainer title={"Reddit Hot List"}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List component="nav">
          {list
            ? list.map((row) => {
                return (
                  <ListItem
                    key={row.id}
                    onClick={() => viewPost(row.id)}
                    button
                  >
                    {row.title}
                  </ListItem>
                );
              })
            : null}
        </List>
      )}
    </CustomContainer>
  );
}
