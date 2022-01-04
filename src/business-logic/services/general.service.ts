import axios from "axios";
import { ProfileRecentMatches } from "../../pages/search/pages/home-profile/home-profile.component";
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

  public getProfileRecentMatch = async (id: number) => {
    // const winMatches: object[] | any = await axios
    //   .get(`https://api.opendota.com/api/players/${id}/matches?limit=20&win=1`)
    //   .then((res) => {
    //     const data: object[] = res.data;
    //     return data;
    //   });
    // const losMatches: object[] | any = await axios
    //   .get(`https://api.opendota.com/api/players/${id}/matches?limit=20&win=0`)
    //   .then((res) => {
    //     const data: object[] = res.data;
    //     return data;
    //   });
    // console.log(winMatches, losMatches, "ddsds");
    // return [
    //   ...winMatches.map((el: any) => ({ ...el, win: true })),
    //   ...losMatches,
    // ].sort((a, b) => {
    //   if (a.start_time < b.start_time) {
    //     return 1;
    //   }
    //   if (a.start_time > b.start_time) {
    //     return -1;
    //   }
    //   return 0;
    // });

    const matches = await axios
      .get(`https://api.opendota.com/api/players/${id}/matches?limit=15`)
      .then((res) => {
        const data: ProfileRecentMatches[] = res.data;
        return data;
      });

    const winMatches = await axios
      .get(`https://api.opendota.com/api/players/${id}/matches?limit=15&win=1`)
      .then((res) => {
        const data: ProfileRecentMatches[] = res.data;
        return data;
      });

    return matches.map((el, i) => {
      let isWin = false;
      for (let i = 0; i < winMatches.length; i++) {
        if (el.match_id === winMatches[i].match_id) {
          isWin = true;
        }
      }
      return isWin ? { ...el, win: true } : el;
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
