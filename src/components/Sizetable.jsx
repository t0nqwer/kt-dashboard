import React from "react";

const Sizetable = ({ data, SizeList, Sizedata, font, fontsmall, color }) => {
  return (
    <table className={`overflow-scroll ${color ? color : ""} w-full mt-5`}>
      <thead>
        <tr>
          {SizeList?.map((e, i) => {
            return (
              <th
                className={`${
                  font ? font : "text-base"
                } font-semibold divide-y divide-dashed `}
                id={e?.Size_ID ? e?.Size_ID : "lo"}
                key={i}
              >
                {e?.Size_ID}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {Sizedata?.map((e, i) => (
          <tr key={e.Detail.Size_De_Name}>
            <td
              key={e.Detail.Size_De_ID}
              className={`w-24 ${
                fontsmall ? fontsmall : "text-sm"
              }  font-semibold text-center py-3`}
            >
              {e.Detail.Size_De_Name}
            </td>
            {data?.Size?.map((p, i) => {
              return p?.Size_De_Info?.map((g, i) => {
                if (g.Detail.Size_De_ID === e.Detail.Size_De_ID) {
                  return (
                    <td
                      key={g.Size_De_Info_ID}
                      className={`w-24 ${
                        font ? font : "text-base"
                      } text-center`}
                    >
                      {g.Info}
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
