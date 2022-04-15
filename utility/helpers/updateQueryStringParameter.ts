export const updateQueryStringParameter = (path:string, key:string, value:string) => {
    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = path.indexOf('?') !== -1 ? '&' : '?';
    if (path.match(re)) {
      return path.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      return path + separator + key + '=' + value;
    }
  };