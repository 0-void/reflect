export default function dontSniffMimetype(requestResponse) {
    requestResponse.setResponseHeader('X-Content-Type-Options', 'nosniff');
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsT0FBTyxVQUFVLGlCQUFpQixDQUFFLGVBQXlDO0lBQ2xGLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBQUEsQ0FBQyJ9