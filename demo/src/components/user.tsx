import { Button } from "@mui/material";
import { useState } from "react";

function User() {
  const [count, setCount] = useState(0);

  
  return (
    <div>
      <h2>counter</h2>
      <p>{count}</p>
      {/* <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button> */}
       <Button
          size="small"
          variant="contained"
          onClick={() => setCount(count + 1)}
          sx={{
            minWidth: 100,
            fontWeight: 600,
          }}
        >
          Add
        </Button>
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => setCount(count - 1)}
          sx={{
            minWidth: 100,
            fontWeight: 600,
            ml: 2,
          }}
        >
          Subtract
        </Button>
    </div>
  );
}
export default User;