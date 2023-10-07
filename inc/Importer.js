import axios from "axios";

class Importer {
  constructor({ url, username, password }) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.baseUrl = `${url}/wp-json/wp/v2`;
  }

  /**
   * Get all posts of a certain post type.
   * @param {string} postType
   * @returns An object with post data.
   */
  async getAllPosts(postType = "posts") {
    const endpoint = `${this.baseUrl}/${postType}`;

    try {
      const res = await axios.get(endpoint);
      const data = res.data;
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get a single specific post.
   * @param {int} id
   * @param {string} postType
   * @returns An object with post data.
   */
  async getPostById(id, postType = "posts") {
    const endpoint = `${this.baseUrl}/${postType}/${id}`;

    try {
      const res = await axios.get(endpoint);
      const data = res.data;
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Create a new post.
   * @param {string} title
   * @param {string} content
   * @param {string} postType
   * @param {string} status
   * @returns An object with post data.
   */
  async createPost(title, content, postType = "posts", status = "publish") {
    const endpoint = `${this.baseUrl}/${postType}`;
    try {
      const res = await axios.post(
        endpoint,
        {
          title,
          content,
          postType,
          status,
        },
        {
          auth: {
            username: this.username,
            password: this.password,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Checks if a post exists by searching using the post title.
   * @param {string} postTitle
   * @param {string} postType
   * @returns A boolean wether or not the post exists.
   */
  async checkIfPostExists(postTitle, postType = "posts") {
    const endpoint = `${this.baseUrl}/${postType}/?search=${encodeURIComponent(
      postTitle
    )}`;
    try {
      const res = await axios.get(endpoint);
      return res.data.length > 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update the value of an ACF field for a single post.
   * @param {int} postId
   * @param {string} field
   * @param {string} value
   * @param {string} postType
   * @returns An object with post data.
   */
  async updatePostField(postId, field, value, postType = "posts") {
    const endpoint = `${this.baseUrl}/${postType}/${postId}`;
    try {
      const res = await axios.post(
        endpoint,
        {
          acf: {
            [field]: value,
          },
        },
        {
          auth: {
            username: this.username,
            password: this.password,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update the terms of a post.
   * @param {int} postId
   * @param {string} taxonomy
   * @param {int[]} terms
   * @param {string} postType
   * @returns An object with post data.
   */
  async updateTerms(postId, taxonomy, terms, postType = "posts") {
    const endpoint = `${this.baseUrl}/${postType}/${postId}`;
    try {
      const res = await axios.post(
        endpoint,
        {
          title: "Updating",
          [taxonomy]: terms,
        },
        {
          auth: {
            username: this.username,
            password: this.password,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      throw new Error(error.message);
    }
  }
}

export default Importer;
