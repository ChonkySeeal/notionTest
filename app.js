const { Client, LogLevel } = require("@notionhq/client");

const notion = new Client({
  auth: "secret_3ovPS05h7kYw14G5n9P7yKum6wvc4h7nc2LtVpnS2Gv",
  logLevel: LogLevel.DEBUG,
});
const databaseId = "d45740c3e2334843ac7cc0f08cfd9c13";

(async () => {
  const notionData = await notion.databases
    .query({
      database_id: databaseId,
      filter: {
        property: "태그",
        rich_text: {
          equals: "1234",
        },
      },
    })
    .then(async (r) => {
      console.log(r);
      await notion.pages.update({
        page_id: r.results[0].id,
        properties: {
          대출: {
            status: {
              name: "무",
            },
          },
        },
      });
    });
})();

// (async () => {
//   const notionData = await notion.pages.create({
//     parent: {
//       type: "database_id",
//       database_id: databaseId,
//     },
//     properties: {
//       이름: {
//         title: [
//           {
//             text: {
//               content: "이기명",
//             },
//           },
//         ],
//       },
//     },
//   });
//   console.dir(notionData.results, { colors: true, depth: 20 });
// })();
