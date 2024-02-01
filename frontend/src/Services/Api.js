
export const RegisterRequest = async (username,email,password) => {
    let response  = fetch('http://127.0.0.1:8000/api/users/register/', {
        method:'POST',
        // mode: 'no-cors',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({'username': username,'password':password,'email':email})
    })
    console.log("this is la reponse :",response);
    return response;
};

export const Loginrequest = async (username,password) => {
    

    let response  = fetch('http://127.0.0.1:8000/api/users/login/', {
        method:'POST',
        // mode: 'no-cors',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({'username': username,'password':password})
    })
    return response;

};
export const getArticleInfo = async (articleId, authToken) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/articles/${articleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Origin: "http://localhost:3000",
          'Authorization': `Bearer ${authToken}` // Include your authentication token here
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch article information');
      }
  
      const articleData = await response.json();
      return articleData;
    } catch (error) {
      console.error('Error fetching article information:', error);
      throw error;
    }
  };
export const modifyArticle = async(articleId,updatedArticle) =>{
    try {
        const response = await fetch(`http://your-api-url/articles/${articleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(updatedArticle),
        });

        if (response.ok) {
            // Handle success
            console.log('Article updated successfully!');
        } else {
            // Handle error
            console.error('Failed to update article');
        }
    } catch (error) {
        console.error('Error updating article:', error);
    }
};
  
