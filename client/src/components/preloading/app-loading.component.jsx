import React from 'react'

const AppPreLoading = () => {
  return (
    <div className='container mx-auto w-full h-screen '>
      <header className='h-12 rounded-lg lg:h-20 animate-pulse dark:bg-slate-600 bg-slate-400'></header>
      <main className='h-[80%] rounded-lg bg-slate-400 dark:bg-slate-600 animate-pulse my-10'></main>
      <footer className='h-6 rounded-lg bg-slate-400 dark:bg-slate-600 animate-pulse'></footer>
    </div>
  )
}

export default AppPreLoading