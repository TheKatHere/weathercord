"use client";

import Box from "../Box/Box";
import Message from "Message";

export const MessageManager = (props: Record<string, any> & {
  // message: string,
  // setMessage: Dispatch<SetStateAction<boolean>>
}) => {
  const data = {
    "messages": [
        {
            "location":0,
            "author":0,
            "time":1782267528,
            "contents":"Hello!! If this is rendering as NUMBER ONE!!!, it's correct!"
        },
        {
            "location":0,
            "author":0,
            "time":1782267530,
            "contents":"Hello!! If this is rendering as NUMBER TWO!!!, it's correct!"
        },
        {
            "location":0,
            "author":0,
            "time":1782267540,
            "contents":"Hello!! If this is rendering as NUMBER THREE!!!, it's correct!"
        }
    ]
}
  return (
    <Box {...props} className={"rounded-2xl " + props.className}>
      <div className="outline-none p-1">
        {data.map(({tag: Cmp, ...other}) => (
          <div key={other.id}>
            {other.label}: <Cmp {...other} />
          </div>
        ))}
      </div>
    </Box>
  )
}