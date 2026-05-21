import { useEffect, useState } from "react";
import axios from "axios";
import { useCategoryList } from "../hook/Categorylist";
import {useCategory } from "../context/categoryId";
import { Backend } from "../pages/Backend";


export const CreateCategory = ({ typee}) => {
  const {categorylist,setCategoryList}=useCategoryList()
  // const [expensecategory, setExpenseCategory] = useState(["Food", "Travel", "Shopping"]);
  // const [incomecategory, setIncomeCategory] = useState(["Salary", "Investment", "Refund"]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const {categoryId,setCategoryId}=useCategory()
  console.log("selected category id :",categoryId)
  // const selectedname=categorylist.find(c=>
  //     c.id==selectedCategory
  //   )

  console.log("catid :",categoryId)
  useEffect(()=>{
      if(categorylist.length>0){
       
        setCategoryId(categorylist?.[0]?.id || "")
      }
  },[categorylist])

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    // if (incomecategory.includes(newCategory)) alert('already exist')
    // if (expensecategory.includes(newCategory)) alert('already exist')

    //api call
    try {

      // if (typee == "income") {
      //   setIncomeCategory((prev) => [...prev, newCategory])
      // }
      // else {
      //   setExpenseCategory((prev) => [...prev, newCategory])
      // }
      setShowCategoryModal(false)

      const token=localStorage.getItem("token")
      const res=await axios.post(`${Backend}/api/v1/category/categories`, { name: newCategory, type:typee }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      console.log("new category id :",typeof(res.data.id))
      setCategoryList(prev => [...prev , res.data] )
      setCategoryId(String(res.data.id))
      setNewCategory("")
    } catch (e) {
      console.error(e)
    }
  }


  return (

   
   <div className="w-full">

  {/* Select */}
  <div className="relative">

    <select
      className="
        w-full

        px-4 py-3

        rounded-2xl

        bg-gray-50 dark:bg-gray-800

        border border-gray-200 dark:border-gray-700

        text-gray-700 dark:text-white

        outline-none

        focus:ring-2 focus:ring-blue-500/30
        focus:border-blue-500

        transition-all duration-200

        appearance-none

        cursor-pointer
      "
      value={categoryId}
      onChange={(e) => {
        console.log("target :",e.target.value)
        setCategoryId(e.target.value);
        if (e.target.value === "add_New") {
        
          setShowCategoryModal(true);
        }
      }}
    >

      {categorylist
        .filter((e) => e.type === typee)
        .map((e) => (
          <option key={e.id} value={String(e.id)}>
            {e.name}
          </option>
        ))}
    
      <option value="add_New">
        + Add Category
      </option>

    </select>

    {/* Arrow */}
    <div
      className="
        pointer-events-none

        absolute right-4 top-1/2
        -translate-y-1/2

        text-gray-400 dark:text-gray-500
      "
    >
      ▼
    </div>

  </div>

  {/* Modal */}
  {showCategoryModal && (

    <div
      className="
        fixed inset-0 z-50

        flex items-center justify-center

        bg-black/40
        backdrop-blur-[2px]

        p-4
      "
    >

      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md

          rounded-3xl

          bg-white dark:bg-gray-900

          border border-gray-200 dark:border-gray-800

          shadow-2xl shadow-black/20

          p-6

          animate-in fade-in zoom-in-95 duration-200
        "
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2
              className="
                text-xl font-bold

                text-gray-800 dark:text-white
              "
            >
              Add Category
            </h2>

            <p
              className="
                text-sm mt-1
                text-gray-500 dark:text-gray-400
              "
            >
              Create a new transaction category
            </p>

          </div>

          {/* Close */}
          <button
            onClick={() => setShowCategoryModal(false)}
            className="
              w-9 h-9

              flex items-center justify-center

              rounded-full

              bg-gray-100 dark:bg-gray-800

              hover:bg-red-100
              dark:hover:bg-red-900/20

              text-gray-500 dark:text-gray-400
              hover:text-red-500

              transition-all duration-200
            "
          >
            ✕
          </button>

        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="
            w-full

            px-4 py-3

            rounded-2xl

            bg-gray-50 dark:bg-gray-800

            border border-gray-200 dark:border-gray-700

            text-gray-700 dark:text-white

            placeholder:text-gray-400

            outline-none

            focus:ring-2 focus:ring-blue-500/30
            focus:border-blue-500

            transition-all duration-200
          "
        />

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">

          {/* Cancel */}
          <button
            onClick={() => setShowCategoryModal(false)}
            className="
              px-4 py-2

              rounded-xl

              bg-gray-100 dark:bg-gray-800

              text-gray-700 dark:text-gray-300

              hover:bg-gray-200
              dark:hover:bg-gray-700

              transition-all duration-200
            "
          >
            Cancel
          </button>

          {/* Save */}
          <button
            onClick={handleAddCategory}
            className="
              px-5 py-2

              rounded-xl

              bg-linear-to-r
              from-blue-500
              to-cyan-500

              text-white font-medium

              shadow-lg shadow-blue-500/20

              hover:scale-[1.03]

              active:scale-[0.97]

              transition-all duration-200
            "
          >
            Save
          </button>

        </div>

      </div>

    </div>

  )}

</div>
  )
}