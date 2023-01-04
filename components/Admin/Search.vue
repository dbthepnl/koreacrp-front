<template>
  <div>
    <form>
            <div class="grid">
                <div class="flex flex-wrap -mx-3">
                    <div class="w-full md:w-1/4 px-2 mt-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-state">
                          시작일
                        </label>
                        <div class="relative">
                          <input type="date"
                            class="block appearance-none w-full  border border-gray-200 text-gray-700 bg-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                            placeholder="시작날짜 선택" />
                        </div>
                    </div> 
                    <div class="w-full md:w-1/4 px-2 mt-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-state">
                          종료일
                        </label>
                        <div class="relative">
                           <input type="date"
                            class="block appearance-none w-full  border border-gray-200 text-gray-700 bg-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                            placeholder="종료날짜 선택" />
                        </div>
                    </div> 
                    <div class="w-full md:w-2/4 px-2 mt-10">
                        <div class="flex justify-items-end border-b border-gray-300 py-2  mb-4">
                            <input  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text"  aria-label="Full name">
                            <button type="submit" class="flex-shrink-0  bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block mb-1 w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                 검색하기 
                            </button>             
                        </div>     
                    </div>   
                </div>
            </div>
        </form>
  </div>
</template>