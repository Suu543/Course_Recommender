//   const listOfLinks = () =>
//     allLinks.map((l, i) => (

//     ))

//   const listOfLinks = () =>
//     allLinks.map((l, i) => (
//       <div>
//         <div>
//           <a href={l.url} target="_blank">
//             <h5>{l.title}</h5>
//             <h6 style={{ fontSize: "12px" }}>{l.url}</h6>
//           </a>
//         </div>
//         <div>
//           <span>
//             {moment(l.createdAt).fromNow()} by {l.postedBy.name}
//           </span>
//         </div>
//         <div>
//           <span>
//             {l.type} / {l.medium}
//           </span>
//           {l.categories.map((c, i) => (
//             <span>{c.name}</span>
//           ))}
//         </div>
//       </div>
//     ));

//   return (
//     <React.Fragment>
//       <div>
//         <div>
//           <h1>{category.name} - URL/LINKS</h1>
//           <div>{renderHTML(category.content || "")}</div>
//         </div>
//         <div>
//           <img
//             src={category.image.url}
//             alt={category.name}
//             style={{ width: "auto", maxHeight: "200px" }}
//           />
//         </div>
//         <br />
//         <div>
//           <div>{listOfLinks()}</div>
//         </div>

//         <div>
//           <h2>Most Populate in {category.name}</h2>
//         </div>
//         <p>load more button</p>
//       </div>
//     </React.Fragment>
//   );
