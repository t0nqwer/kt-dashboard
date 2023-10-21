import React from "react";
import { weights } from "../assets/public";
const Sizetable = ({ data, SizeList, Sizedata, font, fontsmall, color }) => {
  return (
    <table className={`overflow-scroll ${color ? color : ""} w-full mt-5`}>
      <thead>
        <tr>
          {SizeList?.sort((a, b) => weights[a] - weights[b])?.map((e, i) => {
            return (
              <th
                className={`${
                  font ? font : "text-base"
                } font-semibold divide-y divide-dashed `}
                id={e ? e : "lo"}
                key={i}
              >
                {e}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Sizedata?.sort((a, b) => weights[a] - weights[b])?.map((e, i) => (
          <tr key={e}>
            <td
              key={e}
              className={`w-24 ${
                fontsmall ? fontsmall : "text-sm"
              }  font-semibold text-center py-3`}
            >
              {e}
            </td>
            {data?.size
              .sort((a, b) => weights[a.size] - weights[b.size])
              ?.map((p, i) => {
                return p?.details.map((g, i) => {
                  if (g.detail === e) {
                    return (
                      <td
                        key={`${g.detail}${g.amount}`}
                        className={`w-24 ${
                          font ? font : "text-base"
                        } text-center`}
                      >
                        {g.amount}
                      </td>
                    );
                  }
                });
              })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Sizetable;
