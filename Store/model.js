import { create } from "zustand";

export const useOpenModelStore = create((set) => ({
  openModel: null,
  setOpenModel: (openModel) => set({ openModel }),
}));

export const useBaseURLStore = create((set) => ({
  baseURL: import.meta.env?.VITE_BASE_URL ?? "",
  setBaseURL: (baseURL) => set({ baseURL }),
}));

export const useOtpStore = create((set) => ({
  otp: null,
  setOtp: (otp) => set({ otp }),
}));

export const useAccessTokenStore = create((set) => ({
  accessToken: "",
  setAccessToken: (accessToken) => set({ accessToken }),
}));

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useShouldFetchUserStore = create((set) => ({
  shouldFetchUser: false,
  setShouldFetchUser: () =>
    set((state) => ({ shouldFetchUser: !state.shouldFetchUser })),
}));

export const useIsLoginStore = create((set) => ({
  isLogin: null,
  setIsLogin: (boolean) => set({ isLogin: boolean }),
}));

export const useSectionStore = create((set) => ({
  section: "",
  setSection: (section) => set({ section }),
}));

export const useUnderlineToStore = create((set) => ({
  underlineTo: null,
  setUnderlineTo: (underlineTo) => set({ underlineTo }),
}));

export const useQuoraQuestionsStore = create((set) => ({
  quoraQuestions: [],
  setQuoraQuestions: (quoraQuestions) => set({ quoraQuestions }),
}));

export const useIsToAnswerStore = create((set) => ({
  isToAnswer: false,
  setIsToAnswer: (isToAnswer) => set({ isToAnswer }),
  question: "",
  setQuestion: (question) => set({ question }),
  questionId: null,
  setQuestionId: (questionId) => set({ questionId }),
}));

export const useShouldRefetchQuestionStore = create((set) => ({
  shouldRefetchQuestion: false,
  setShouldRefetchQuestion: () =>
    set((state) => ({ shouldRefetchQuestion: !state.shouldRefetchQuestion })),
}));

export const useReportStore = create((set) => ({
  report: {},
  setReport: (report) => set({ report }),
}));

export const useIsFollowingStore = create((set) => ({
  // isFollowing: {},
  // setIsFollowing: (isFollowing) => set({ ...isFollowing }),
  isFollowing: false,
  setIsFollowing: (isFollowing) => set({ isFollowing }),
}));

export const useSetttingManuStore = create((set) => ({
  selectedSettingManu: "account",
  setSelectedSettingManu: (selectedSettingManu) => set({ selectedSettingManu }),
}));
export const useSettingModelStore = create((set) => ({
  settingModel: null,
  setSettingModel: (settingModel) => set({ settingModel }),
}));

export const useSelectedLanguageStore = create((set) => ({
  selectedLanguage: "",
  setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),
}));

export const usePasswordStore = create((set) => ({
  password: "",
  setPassword: (password) => set({ password }),
  isResponseOk: false,
  setResponseOk: (isResponseOk) => set({ isResponseOk }),
  addAnotherEmail: { isAddTo: false, email: "" },
  setAddAnotherEmail: (addAnotherEmail) => set({ addAnotherEmail }),
  emailId: { email: "", id: {} },
  setEmailId: (emailId) => set({ emailId }),
}));

export const useEmailsStore = create((set) => ({
  emails: [],
  setEmails: (emails) => set({ emails }),
}));

export const useIsCorrectPasswordStore = create((set) => ({
  isCorrectPassword: false,
  setIsCorrectPassword: (isCorrectPassword) => set({ isCorrectPassword }),
}));

export const useDisplayModeStore = create((set) => ({
  displayMode: "auto",
  setDisplayMode: (displayMode) => set({ displayMode }),
}));

// navbar
export const useSearchValueStore = create((set) => ({
  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
}));
export const useBookmarksStore = create((set) => ({
  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks }),
}));

export const useProfileUserStore = create((set) => ({
  profileUser: null,
  setProfileUser: (profileUser) => set({ profileUser }),
  profileUsername: "",
  setProfileUsername: (profileUsername) => set({ profileUsername }),
}));

export const useInputValueStore = create((set) => ({
  inputValue: "",
  setInputValue: (inputValue) => set({ inputValue }),
}));

export const useRawContentStore = create((set) => ({
  rawContent: "",
  setRawContent: (rawContent) => set({ rawContent }),
}));

export const useDataStore = create((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

export const useCommentsStore = create((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  isComments: false,
  setIsComments: (isComments) => set({ isComments }),
}));

export const useHasQuestionStore = create((set) => ({
  hasQuestion: false,
  setHasQuestion: (hasQuestion) => set({ hasQuestion }),
}));

// const khani = [
//   { name: "भोले", role: "भगवान" },
//   { name: "कनहिया" },
//   { name: "विष्णु", role: "भगवान" },
//   { name: "ब्रह्मा", role: "भगवान" },
//   { name: "गौरी", role: "मातारानी" },
//   { name: "लक्ष्मी", role: "मातारानी" },
//   { name: "ब्रह्माणी", role: "मातारानी" },
// ];

// const group = khani.reduce((acc, ek) => {
//   (acc[ek.role || "general"] = acc[ek.role] || []).push(ek);
//   return acc;
// }, {});

// // console.log(group); // group by role

// const date = new Date();
// const format = new Intl.DateTimeFormat("hi-IN", {
//   dateStyle: "full",
// }).format(date);

// console.log(format);
// console.log(new Intl.Collator("hi-IN").compare("भोले", "कनहिया"));

// console.log(new Intl.PluralRules("hi-IN").select(0));
// console.log(new Intl.NumberFormat("hi-IN").format(10000000));

// function star(size = 10, reverse = false) {
//   // left to right

//   // for (let i = 0; i < size; i++) {
//   //   console.log(". |".repeat(i));
//   // }
//   // for (let i = 0; i < size; i++) {
//   //   console.log("- ".repeat(size - i));
//   // }

//   // vertically
//   for (let i = 0; i < size; i++) {
//     // both side
//     // console.log(
//     //   " ".repeat(!reverse ? size - i : i) +
//     //     "*".repeat(!reverse ? i : size - i) +
//     //     "*".repeat(!reverse ? (i > 1 ? i - 1 : " ") : size - 1 - i)
//     // );
//     // top to down
//     // console.log(
//     //   " ".repeat(size - i) + "*".repeat(i) + "*".repeat(i > 1 ? i - 1 : " ")
//     // );
//     // down to top
//     // console.log(
//     //   " ".repeat(i) + "*".repeat(size - i) + "*".repeat(size - 1 - i)
//     // );
//     // magic
//     // console.log(" ".repeat(size - i), "* ".repeat(i), "*".repeat(i));
//   }
// }

// // star(undefined, false);
// star();

// fetch("http://127.0.0.1:1000/").then((res) => console.log(res));
