import axios from "axios";
import { HttpService } from "./http";

// const allEl = [];

class GeneralService {
  /**
   * Init
   */
  public constructor(private http: HttpService) {}

  /**
   * Request
   */
  public request = () =>
    this.http.request({
      method: "GET",
      url: "/in-progress",
    });

  public getHeroes = () => {
    return axios.get(`https://api.opendota.com/api/heroes`).then((res) => {
      const persons: any = res.data;
      console.log(persons, "persons");
      return persons;
    });
  };

  public search = (text: string) => {
    return axios
      .get(`https://api.opendota.com/api/search?q=${text}`)
      .then((res) => {
        return res.data;
      });
  };

  public getProfile = (id: number) => {
    return axios
      .get(`https://api.opendota.com/api/players/${id}`)
      .then((res) => {
        return res.data;
      });
  };

  public getProfileRecentMatch = (id: number) => {
    return axios
      .get(`https://api.opendota.com/api/players/${id}/recentMatches`)
      .then((res) => {
        const data: typeof res.data = res.data;
        return data;
      });
  };

  //   public fetchEl = (id) => {
  //     return allEl;
  //   };
  //   public addEl = (allData, newData) => {
  //     return [...allData, ...[newData]];
  //   };
  //   public removeEl = (id, allData) => {
  //     return allData.filter((el) => el.id !== id);
  //   };
  //   public pruductView = (id) => {
  //     return id;
  //   };
  //   public addComment = (id, commentData, allData) => {
  //     const oldComments = allData.filter((el) => el.id === id)[0].comments;

  //     const currentComment = [...oldComments, ...[commentData]];

  //     return allData.map((el) => {
  //       if (el.id === id) {
  //         return { ...el, comments: currentComment };
  //       } else {
  //         return el;
  //       }
  //     });
  //   };
  //   public editProduct = (id, newValues, allData) => {
  //     console.log(id, newValues);
  //     return allData.map((el) => {
  //       if (el.id === id) {
  //         console.log(el.id, id);
  //         return {
  //           ...el,
  //           name: newValues.name,
  //           count: newValues.count,
  //           imageUrl: newValues.imageUrl,
  //           size: newValues.size,
  //           weight: newValues.weight
  //         };
  //       } else {
  //         return el;
  //       }
  //     });
  //   };
}
export { GeneralService };
