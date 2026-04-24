import { useEffect, useState } from "react";
import axios from "axios";
import { useCategoryList } from "../hook/Categorylist";
import { ContextCategoryId } from "../context/categoryId";


export const CreateCategory = ({ typee }) => {
  const {categorylist,setCategoryList}=useCategoryList()
  const [expensecategory, setExpenseCategory] = useState(["Food", "Travel", "Shopping"]);
  const [incomecategory, setIncomeCategory] = useState(["Salary", "Investment", "Refund"]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  console.log(selectedCategoryId)
  // const selectedname=categorylist.find(c=>
  //     c.id==selectedCategory
  //   )
  useEffect(()=>{
      if(categorylist.length>0){
        setSelectedCategoryId(categorylist[0].id)
      }
  },[categorylist])

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    // if (incomecategory.includes(newCategory)) alert('already exist')
    // if (expensecategory.includes(newCategory)) alert('already exist')

    //api call
    try {

      if (typee == "income") {
        setIncomeCategory((prev) => [...prev, newCategory])
      }
      else {
        setExpenseCategory((prev) => [...prev, newCategory])
      }
      setShowCategoryModal(false)
      const res=await axios.post(`http://127.0.0.1:8787/api/v1/category/categories`, { name: newCategory, type:typee }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbm9wdHhuNTAwMDBkc3hzczF6ZmZ5OHoifQ.k5zXrqFFvnOhFnhgQTqgpjxjqLxIYEFUQfSYrKNqATY`
        },
      })
      console.log("new category id :",typeof(res.data.id))
      setCategoryList(prev => [...prev , res.data] )
      setSelectedCategoryId(String(res.data.id))
      setNewCategory("")
    } catch (e) {
      console.error(e)
    }
  }


  return (
    <ContextCategoryId.Provider value={selectedCategoryId}  >

   
    <div>
      
      <select className="w-full p-1 pl-3  border rounded-lg "
        value={selectedCategoryId}
        onChange={(e) => {
          if (e.target.value == "add_New") {
            setShowCategoryModal(true)
          }
          else {
            setSelectedCategoryId(e.target.value)
          }
        }}
      >

        {categorylist.filter((e)=> e.type==typee)
          .map((e)=>(
              <option key={e.id} value={String(e.id)}>{e.name}</option>
          ))
        }

        {/* {typee == "income" ? incomecategory.map((e) => (
          <option key={e} value={e}>{e}</option>
        )) : expensecategory.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))} */}
        <option value="add_New">+ add category</option>
      </select>


      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-5 shadow-lg">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Category</h2>
              <button onClick={() => setShowCategoryModal(false)}>✕</button>
            </div>

            {/* Input */}
            <input
              type="text"
              placeholder="Category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border p-2 rounded-lg mb-4"
            />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-3 py-1 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleAddCategory}
                className="px-3 py-1 rounded-lg bg-blue-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
     </ContextCategoryId.Provider>
  )
}