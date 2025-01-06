import { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import axios from "axios";
import Display from "./Display";
import Categories from "./CategoriesList";
function Catalogue(){
    const[search, setsearch] =useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [mainCategory, setMainCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const handleClick = () => {
        setIsVisible(true); // Update the state to make the element visible
      };
      const handleMainCategoryChange = (category) => {
        setMainCategory([...mainCategory, category]);
        console.log(mainCategory);
      }
    return <>
    <Header/>
    <div>WHAT ARE YOU LOOKING FOR TODAY?</div>
    <input className='search' type='text' value={search} onChange={(e)=>setsearch(e.target.value)}/>
    <button className='search-btn' onClick={handleClick}>SEARCH</button> 
    <div>
        <div className="main">
              {Object.keys(Categories).map((category) => (
                <div key={category}>
                  <label>
                    <input
                      type="checkbox"
                      name="mainCategory"
                      /*checked={mainCategory === category}*/
                      onChange={() => handleMainCategoryChange(category)}
                    />
                    {category}
                  </label>

                  
                  
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                      {Categories[category].map((sub) => (
                        <label key={sub} style={{ display: "block", margin: "5px 0" }}>
                          <input
                            type="checkbox"
                            name="subCategory"
                            /*checked={subCategory === sub}
                            onChange={() => {
                              setSubCategory(sub);
                              console.log(sub);
                              handleMainCategoryChange(category);
                            }}*/
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                </div>
              ))}
            </div>
            </div>
    {isVisible && (
        <Display search={search} setIsVisible={setIsVisible} mainCategory={mainCategory} subCategory={subCategory}/>
      )} 
    {/*<Display search={search}/>
    <div>
        <ul>
            {result.map((item, index)=>(
                <li key={index}>{item.pname}</li>
            ))}
        </ul>
    </div>*/}
    </>
}
export default Catalogue;