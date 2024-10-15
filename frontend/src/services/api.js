import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api_solver/";


export class ApiService {
  constructor(authTokens) {
    this.authTokens = authTokens;
  }

  setAuthTokens(authTokens) {
    this.authTokens = authTokens;
  }

  async sendData(matrix, vector) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}tasks/`,
        {
          matrix,
          vector,
        },
        {
          headers: {
            Authorization: 'Bearer ' + String(this.authTokens.access),
          },
        }
      );

      const { task_id } = response.data;

      console.log("Task ID:", task_id);
      return task_id;
    } catch (err) {
      console.error("Error creating task:", err);
      throw err;
    }
  }

  async getTasks() {
    try {
      const response = await axios.get(`${API_BASE_URL}tasks/`, {
        headers: {
          Authorization: 'Bearer ' + String(this.authTokens.access),
        }
      })
      return response.data;
    } catch (err) {
      console.error("Error creating task:", err);
      throw err;
    }
  }

  async cancelTask(task_id) {
    try {
      const formData = new FormData();
      formData.append('task_id', task_id);
      const response = await axios.put(`${API_BASE_URL}tasks/cancel/`,
        formData,
        {
        headers: {
          Authorization: 'Bearer ' + String(this.authTokens.access),
        }
      })

      return response.data;
    } catch (err) {
      console.error("Error creating task:", err);
      throw err;
    }

    
  }
}
