import { node, bool, func, number } from "prop-types";
import { Box, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollBase = ({
  children,
  dataLength,
  hasNextPage,
  fetchNextPage,
}) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      }
      style={{ overflow: "hidden" }}
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollBase;

InfiniteScrollBase.propTypes = {
  children: node.isRequired,
  dataLength: number,
  hasNextPage: bool,
  fetchNextPage: func,
};

InfiniteScrollBase.defaultProps = {
  dataLength: 0,
  hasNextPage: false,
  fetchNextPage: () => {},
};
