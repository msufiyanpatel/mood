import { POST } from "@/app/api/journal/route"

const createURL = (path) => {
    return window.location.origin + path
}

export const updateEntry = async (id, content) => {
    const res = await fetch(
      new Request(createURL(`/api/journal/${id}`),{
        method: 'PATCH',
        body: JSON.stringify({ content }),
        headers: new Headers({
          // ...
        })
      })
    );
  
    if(res.ok){
      const data = await res.json();
      debugger;
      return data.data;
    }
  };
  

export const createNewEntry=async () => {
    const res = await fetch(
        new Request(createURL('/api/journal'), {
            method: 'POST',
        })
    )

    if(res.ok){
        const data = await res.json()
        return data.data
    }
}