import axios from "axios";
import { ProfileRecentMatches } from "../../pages/search/pages/profile.hook";

import { HttpService } from "./http";

// const allEl = [];

class GeneralService {
  /**
   * Init
   */
  public constructor(private http: HttpService) {}

  baseUrl = "https://api.opendota.com/api";

  /**
   * Request
   */
  public request = () =>
    this.http.request({
      method: "GET",
      url: "/in-progress",
    });

  public getHeroes = () => {
    return axios.get(`${this.baseUrl}/heroStats`).then((res) => {
      const persons: any = res.data;
      return persons;
    });
  };

  public search = (text: string) => {
    return axios.get(`${this.baseUrl}/search?q=${text}`).then((res) => {
      return res.data;
    });
  };

  public getProfile = async (id: number) => {
    return {
      profile: await axios.get(`${this.baseUrl}/players/${id}`).then((res) => {
        return res.data;
      }),
      winRate: await axios
        .get(`${this.baseUrl}/players/${id}/wl`)
        .then((res) => {
          return res.data;
        }),
    };
  };

  public getProfileRecentMatch = async (id: number, count: number) => {
    const matches = await axios
      .get(`${this.baseUrl}/players/${id}/matches?limit=${count}`)
      .then((res) => {
        const data: ProfileRecentMatches[] = res.data;
        return data;
      });

    const winMatches = await axios
      .get(`${this.baseUrl}/players/${id}/matches?limit=${count}&win=1`)
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
  public getMatch = (id: string) => {
    return axios.get(`${this.baseUrl}/matches/${id}`).then((res) => {
      return res.data;
    });
  };

  public getPlayerHeroes = (id: string, limit: number) => {
    return axios
      .get(`${this.baseUrl}/players/${id}/heroes`)
      .then((res) => res.data);
  };

  public getWardMap = (id: string) => {
    return axios
      .get(`${this.baseUrl}/players/${id}/wardmap`)
      .then((res) => res.data);
  };

  public getHistogram = (id: string, field: string) => {
    return axios
      .get(`${this.baseUrl}/players/${id}/histograms/${field}`)
      .then((res) => res.data);
  };
  public getItems = () => {
    return axios.get(`${this.baseUrl}/constants/items`).then((res) => res.data);
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
