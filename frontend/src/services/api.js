import axios from "axios";

const API_BASE_URL = "http://localhost/api_solver/";

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

  async getResult(taskId) {
    try {
      const response = await axios.get(`${API_BASE_URL}tasks/${taskId}/result/`, 
        {
          headers: {
            Authorization: 'Bearer ' + String(this.authTokens.access),
        }}
      )
      return response.data; 
    } catch (err) {
      console.error("Error creating task:", err);
      throw err;
    }
  }

  async cancelTask(taskId) {
    try {
      console.log('asd', taskId);
      const formData = new FormData();
      formData.append('task_id', taskId);
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

  async deleteTask(task_id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}tasks/${task_id}/`, {
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
